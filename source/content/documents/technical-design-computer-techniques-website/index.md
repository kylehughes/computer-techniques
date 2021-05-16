---
title: "Technical Design: Computer Techniques Website"
description: "The technical design for the Computer Techniques website."
date: "2019-10-31"
categories:
  - "computer-techniques"
  - "technical-design"
  - "web-development"
tags:
  - "computer-techniques"
  - "technical-design"
  - "web-development"
draft: true
---

The introduction goes here.

## Requirements

## Design

### High-Level Architecture

{{< svg src="images/diagram_high-level-architecture_components" class="full-document__diagram" >}}

#### Components

##### AWS CloudFront

[AWS CloudFront][aws_cloudfront] is the content delivery network used to distribute the contents of the *Computer Techniques* website. There is a CloudFront distribution created for the *kylehugh.es* S3 bucket. When HTTP(S) requests are made to *kylehugh.es* they are routed to this CloudFront distribution by Route 53.

CloudFront caches the contents of the *kylehugh.es* S3 bucket on the edges of its network, globally. The CloudFront cache is invalidated by the build system after a successful deployment to the S3 bucket. 

CloudFront is also where the TLS connection to *kylehugh.es* is terminated.

[aws_cloudfront]: https://aws.amazon.com/cloudfront/

##### AWS Route 53

[AWS Route 53][aws_route-53] is the domain name registrar and Domain Name System provider for the *kylehugh.es* domain name that the *Computer Techniques* website is hosted under. The A Record for *.kylehugh.es* points to the CloudFront distribution for the *kylehugh.es* S3 bucket.

[aws_route-53]: https://aws.amazon.com/route53/

##### AWS S3

[AWS S3][aws_s3] is the hosting provider for the *Computer Techniques* website. There is a *kylehugh.es* bucket that contains the latest contents of the website. The bucket is configured for static website hosting.

The contents of the bucket are not accessed directly by users. Users access the CloudFront distribution for the bucket which contains a cache of the contents.

[aws_s3]: https://aws.amazon.com/s3/

##### GitHub

[GitHub][github] is where the *Computer Techniques* git repository is hosted.

[github]: https://github.com

##### GitHub Actions

[GitHub Actions][github_actions] is used to model the deployment pipeline ("workflow" in GitHub Actions terminology) for the *Computer Techniques* website.

[github_actions]: https://github.com/features/actions

##### gulp.js

[gulp.js][gulpjs] is used by the *Computer Techniques* website module to model the *build* and *deploy* actions.

The GitHub Actions workflow invokes a gulp.js command to perform its own *build* and *deploy* actions. This is done because the third-party support for publishing to AWS is currently more robust with node.js than with GitHub Actions. The balance may change in the future.

[gulpjs]: https://gulpjs.com/

##### Hugo

[Hugo][hugo] is the static site generator used to build the *Computer Techniques* website.

The GitHub Actions deployment workflow invokes Hugo to produce the HTML that is then uploaded to the S3 bucket.

[hugo]: https://gohugo.io/

### Deployment

The deployment sequence for the *Computer Techniques* website can be modeled as a pipeline.

{{< svg src="images/diagram_high-level-architecture_pipeline" class="full-document__diagram full-document__diagram--transparent" >}}

#### 1. Listening

{{< svg src="images/diagram_high-level-architecture_pipeline_1" class="full-document__diagram full-document__diagram--transparent" >}}

#### 2. Building

{{< svg src="images/diagram_high-level-architecture_pipeline_2" class="full-document__diagram full-document__diagram--transparent" >}}

#### 3. Publishing

#### 4. Invalidating

## References

- [Hugo Example Blog][hugo_example-blog]: A public GitHub repository showcasing many Hugo features in a sandbox environment.

[hugo_example-blog]: https://github.com/gohugoio/hugo/tree/master/examples/blog
