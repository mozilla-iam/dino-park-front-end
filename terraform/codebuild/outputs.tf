output "iam_role_arn" {
  value       = "${aws_iam_role.codebuild.arn}"
  description = "ARN of the codebuild user. Needed by cluster admins to authorize deploying to Kubernetes"
}

output "ecr_url" {
  value       = "${aws_ecr_repository.registry.repository_url}"
  description = "URL of the new container registry which will host your builds"
}

