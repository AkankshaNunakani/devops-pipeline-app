pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN') // ✔️ Use exact ID from Jenkins credentials
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
                    
                    bat 'sonar-scanner -Dsonar.token=%SONAR_TOKEN%'
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
                 echo 'Deploying to staging...'
                 bat 'docker run -d -p 3000:3000 devops-app'
             }
         }

        stage('Deploy') {
    steps {
        echo 'Stopping old container if running...'
        bat 'docker stop devops-container || echo "No container to stop"'
        bat 'docker rm devops-container || echo "No container to remove"'

        echo 'Deploying Docker container...'
        bat 'docker run -d -p 3000:3000 --name devops-container devops-app'
    }
}
        // stage('Monitoring') {
        //     steps {
        //         echo 'Simulated Monitoring: App is up and running'
        //         // For HD: You can integrate Prometheus, Grafana, or just check app health
        //     }
        // }
    }
}
