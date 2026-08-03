# Patient Service

Part of the **MedConnect Platform** — a healthcare Internal Developer Platform (IDP) demo project.

## What This Service Does

Provides CRUD (Create, Read, Update, Delete) operations for patient records.

## Tech Stack

- Node.js + Express
- Docker (multi-stage build, non-root user)
- Kubernetes (Deployment + Service, resource limits, health probes)
- ArgoCD (GitOps deployment)
- GitHub Actions (CI/CD with Trivy security scanning)

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /patients | List all patients |
| GET | /patients/:id | Get a specific patient |
| POST | /patients | Create a new patient |
| PUT | /patients/:id | Update a patient |
| DELETE | /patients/:id | Delete a patient |

## Running Locally

npm install
npm run dev

## Running with Docker

docker build -t medconnect-patient-service:v1 .
docker run -p 3000:3000 medconnect-patient-service:v1

## Deployment (Kubernetes + GitOps)

This service is deployed to Kubernetes via ArgoCD, which watches the k8s/ folder
in this repo and automatically syncs any changes to the cluster — no manual
kubectl apply needed after the initial setup.

kubectl get pods -n medconnect-dev
kubectl get svc -n medconnect-dev

## CI/CD Pipeline

Every push to main triggers:
1. Docker image build
2. Trivy security scan (CRITICAL/HIGH vulnerabilities)
3. Push to Docker Hub

See .github/workflows/ci.yml

## Architecture

Developer push -> GitHub Actions (build + scan + push image)
                        ->
              Docker Hub (image registry)
                        ->
ArgoCD (watches k8s/ folder) -> Kubernetes (medconnect-dev namespace)

## Owner

MedConnect Platform Team (demo project) — owner: patient-team label applied to all K8s resources.

## Status

Phase 1 Complete — core service, containerization, CI/CD, Kubernetes deployment, and GitOps all working end-to-end.

This service's structure (Dockerfile, CI/CD pipeline, K8s manifests) serves as the
reference template for all other MedConnect services (appointment, prescription,
lab-results, billing).
