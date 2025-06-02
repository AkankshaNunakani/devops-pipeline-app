pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
                echo 'Building Docker image...'
                bat 'docker build -t devops-app .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Jest tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality - SonarCloud') {
            steps {
                echo 'Running SonarCloud analysis...'
                withSonarQubeEnv('SonarCloud') {
                    bat 'npm test -- --coverage'
                    bat 'sonar-scanner'
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running security scan using npm audit...'
                bat 'npm audit --audit-level=low || exit 0'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the app in a container...'
                bat 'docker run -d -p 3000:3000 --name devops-container devops-app'
            }
        }

        stage('Release') {
            steps {
                echo 'Release stage simulated: tagging release.'
                bat 'git tag -a v1.0 -m "Release version 1.0"'
                bat 'git push origin v1.0'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking container logs for monitoring...'
                bat 'docker logs --tail 10 devops-container || echo "Container not running or no logs available"'
            }
        }
    }
}
