pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'pnpm build:cicd'
            }
        }
        stage('Format All') {
            steps {
                sh 'pnpm format:cicd'
            }
        }
        stage('Check TypeScript') {
            steps {
                sh 'pnpm typecheck'
            }
        }
        stage('Test') {
            steps {
                sh 'pnpm test:cicd'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sourceDir = "./dist/browser/."
                    destDir = "/usr/share/nginx/html/hex2048.stetsen.co/browser"
                }
                sh "cp -ap ${sourceDir} ${destDir}"
            }
        }
    }
}