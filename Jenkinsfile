pipeline {
    agent any

    stages {
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
    }
}
