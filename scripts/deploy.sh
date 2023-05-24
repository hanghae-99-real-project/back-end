#!/bin/bash

# 환경 변수 정의
BUCKET_NAME="karyl"
PROJECT_NAME="back-end"

# 애플리케이션 빌드
npm run build

# S3에 배포
aws s3 cp ./build s3://$BUCKET_NAME/$PROJECT_NAME --recursive

# CodeDeploy 배포
aws deploy create-deployment --application-name MyApp --deployment-group-name MyDeploymentGroup --s3-location bucket=$BUCKET_NAME,key=$PROJECT_NAME --region ap-northeast-2