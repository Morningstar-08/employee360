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
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }

        stage('Tests') {
            steps {
                script {
                    // Add any tests you want to run after deployment here
                    // For example, checking the app is running:
                    sh 'curl -f http://localhost:5000/ || exit 1'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()  // Clean up workspace (optional)
        }
    }
}