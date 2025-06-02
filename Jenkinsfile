pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('SONAR_TOKEN')
  }

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

    stage('Code Quality - SonarCloud') {
      steps {
        echo 'Running SonarCloud analysis...'
        withSonarQubeEnv('SonarCloud') {
          bat 'npm test -- --coverage'
          bat 'sonar-scanner'
        }
      }
    }
  }
}
