pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'employee360'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    // Build and run Docker containers in detached mode
                    docker-compose up -d
                }
            }
        }
    
    post {
        always {
            cleanWs()  // Clean up workspace (optional)
        }
    }
}