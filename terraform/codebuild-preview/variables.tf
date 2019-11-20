variable "project_name" {
  description = "DinoPark Front-End - Preview - DinoParks beautiful user facing side."
  default     = "dino-park-front-end-preview"
}

variable "github_repo" {
  default = "https://github.com/mozilla-iam/dino-park-front-end"
}

variable "buildspec_file" {
  description = "Path and name of your builspec file"
  default     = "buildspec-preview.yml"
}

# Find all the supported images by AWS here: 
# https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html
variable "build_image" {
  default = "aws/codebuild/standard:1.0"
}

