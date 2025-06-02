pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN') // Make sure Jenkins ID is SONAR_TOKEN
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
                echo 'Running npm audit for vulnerabilities...'
                bat 'npm audit --audit-level=low || exit 0'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app to Docker container...'
                bat 'docker run -d -p 3000:3000 --name devops-app-container devops-app'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Simulating monitoring stage (e.g., logs or metrics)...'
                bat 'docker logs devops-app-container'
            }
        }
    }
}
