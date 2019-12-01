'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import gulp from 'gulp';
import awspublish from 'gulp-awspublish';
import cloudFrontInvalidator from 'gulp-cloudfront-invalidate-aws-publish';
import { exec } from 'child_process';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURATION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const awsConfig = {
    cloudFront: {
        distribution: 'E24FHCJ6DR2GAN'
    },
    credentials: {
        accessKeyId: process.env.BROCK_PROD_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.BROCK_PROD_AWS_SECRET_ACCESS_KEY
    },
    s3: {
        bucket: 'kylehugh.es',
        region: 'us-west-2'
    }
};

const directories = {
    dest: './build'
};

const hugoConfig = {
    encoding : 'utf-8'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TASKS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Task: hugo:build
    Description: 
*/

gulp.task(
    'hugo:build',
    function(done) {
        exec('hugo --minify', hugoConfig, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            done(err);
        });
    }
);

/*
    Task: build
    Description: 
*/

gulp.task('build', gulp.series('hugo:build'));

/*
    Task: deploy
    Description: 
*/

gulp.task('deploy', gulp.series('build', function() {
    const cloudFrontInvalidationConfig = {
        distribution: awsConfig.cloudFront.distribution,
        accessKeyId: awsConfig.credentials.accessKeyId,
        secretAccessKey: awsConfig.credentials.secretAccessKey,
        wait: true,
        originPath: '',
        indexRootPath: true
    };

    const s3PublishConfig = {
        region: awsConfig.s3.region,
        params: {
            Bucket: awsConfig.s3.bucket
        },
        accessKeyId: awsConfig.credentials.accessKeyId,
        secretAccessKey: awsConfig.credentials.secretAccessKey
    };

    const publisher = awspublish.create(s3PublishConfig);

    return gulp
        .src(directories.dest + '/**/*')
        .pipe(publisher.publish())
        .pipe(cloudFrontInvalidator(cloudFrontInvalidationConfig))
        .pipe(awspublish.reporter());
}));

/*
    Task: default
    Description: 
*/

gulp.task('default', gulp.series('build'));
