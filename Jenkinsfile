pipeline {
    agent any
    stages {
        stage('Checkout Stage') {
            steps {
                checkout scm
            }
        }
        stage('Compose') {
            steps {
                // Change directory and run docker-compose in the same shell invocation
                bat '''
                    docker-compose up -d --build
                '''
            }
        }
    }
}