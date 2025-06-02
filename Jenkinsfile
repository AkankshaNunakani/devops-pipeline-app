pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token') // already configured
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

        // You can add these in later:
        // stage('Deploy') { ... }
        // stage('Release') { ... }
        // stage('Monitoring') { ... }
    }
}
