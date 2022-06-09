#---
# CodeBuild and GitHub webhooks
#---

# You can find more options for customizing this resource to your needs
# here: https://www.terraform.io/docs/providers/aws/r/codebuild_project.html
resource "aws_codebuild_project" "build" {
  name          = var.project_name
  description   = "CI pipeline for ${var.project_name}"
  build_timeout = "60" #In minutes
  service_role  = aws_iam_role.codebuild.arn

  # Valid values for this parameter are: CODEPIPELINE, NO_ARTIFACTS or S3.
  # If you are building a Docker container and pushing it to some registry,
  # leave this as default
  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type = "BUILD_GENERAL1_LARGE"
    image        = var.build_image
    type         = "LINUX_CONTAINER"

    # You need "true" here to be able to run Docker daemon inside the building container
    privileged_mode = "true"

    environment_variable {
      name  = "DOCKER_REPO"
      value = aws_ecr_repository.registry.repository_url
    }

    environment_variable {
      name  = "DOCKERHUB_USERNAME"
      type  = "SECRETS_MANAGER"
      value = "/CodeBuild/dockerhub:username"
    }

    environment_variable {
      name  = "DOCKERHUB_PASSWORD"
      type  = "SECRETS_MANAGER"
      value = "/CodeBuild/dockerhub:password"
    }
  }

  source {
    # Choose type "NO_SOURCE" to don't build from Github
    type      = "GITHUB"
    location  = var.github_repo
    buildspec = var.buildspec_file
  }

  tags = {
    "App" = var.project_name
  }
}

# Unomment this section if you do want to build automatically on push
resource "aws_codebuild_webhook" "webhook" {
  project_name = aws_codebuild_project.build.name
  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH"
    }

    filter {
      type    = "HEAD_REF"
      pattern = "(^refs/heads/master$|^refs/tags/.*-(prod|test))"
    }
  }
}

#---
# IAM configuration
#---

resource "aws_iam_role" "codebuild" {
  name = "${var.project_name}-codebuild"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

}

resource "aws_iam_role_policy" "codebuild" {
  role = aws_iam_role.codebuild.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs",
        "ecr:*",
        "eks:DescribeCluster"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Resource": [
        "arn:aws:secretsmanager:*:*:secret:/CodeBuild/dockerhub*"
      ],
      "Action": [
        "secretsmanager:GetSecretValue"
      ]
    }
  ]
}
POLICY

}

#---
# ECR
#---

resource "aws_ecr_repository" "registry" {
  name = var.project_name
}

resource "aws_ecr_repository_policy" "registrypolicy" {
  repository = aws_ecr_repository.registry.name

  policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
              "AWS": "${aws_iam_role.codebuild.arn}"
            },
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
        }
    ]
}
EOF

}

resource "aws_ecr_lifecycle_policy" "keep-30" {
  repository = aws_ecr_repository.registry.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 30 images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 30
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
