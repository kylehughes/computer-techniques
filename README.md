# Computer Techniques

![](https://github.com/kylehughes/brock/workflows/Deploy%20to%20production/badge.svg)

## Specification

### Building

- **Build System**: [gulp.js][spec_gulp]
- **Static Site Generator**: [Hugo][spec_hugo]

### Deploying

- **Pipeline**: GitHub Actions

### Serving

- **Hosting**: Amazon AWS S3
- **Distribution**: Amazon AWS CloudFront
- **Nameservers**: Amazon AWS Route 53
- **Name Registrar**: Namecheap

[spec_gulp]: https://github.com/gulpjs/gulp/
[spec_hugo]: http://gohugo.io/

## Setup

### Local 

#### Workspace

1. Install *npm*:

    ```sh
    brew install npm
    ```

2. Install *gulpjs*:

    ```sh
    npm install --global gulp
    ```

3. Install *npm* dependencies:

    ```sh
    npm install
    ```

4. Install *Hugo*:

    ```sh
    brew install hugo
    ```

### Remote

#### Repository

##### Secrets

- `BROCK_PROD_AWS_ACCESS_KEY_ID`
- `BROCK_PROD_AWS_SECRET_ACCESS_KEY`
- `PHONE_NUMBER_TWILIO`
- `PHONE_NUMBER_PERSONAL`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_API_KEY`
- `TWILIO_API_SECRET`

## Workflows

### Developing

1. Run *Hugo*'s server to build and serve the site locally:

    ```sh
    hugo server
    ```

### Deploying

#### Automated

Push production-ready changes to `origin/mainline`. The *Deploy to production* GitHub Action will be run automatically.

#### Manual

Manual deployments are not supported.

## Tech Notes

### How I make subdirectory index pages work with CloudFront

e.g. `/documents/`

We want to let the S3 distribution handle the "error" when CloudFront cannot resolve the URL without specifying the `index.html` file name. We change the origin domain name for the distribution to point to the S3 website hosting URL.

Currently, the origin domain name of the CloudFront distribution is `kylehugh.es.s3-website-us-west-2.amazonaws.com`.

Previously, the origin domain name of the CloudFront distribution was `kylehugh.es.s3.amazonaws.com`.

Source: https://stackoverflow.com/questions/31017105/how-do-you-set-a-default-root-object-for-subdirectories-for-a-statically-hosted

www.kylehugh.es.s3-website-us-west-2.amazonaws.com
kylehugh.es.s3-website-us-west-2.amazonaws.com
