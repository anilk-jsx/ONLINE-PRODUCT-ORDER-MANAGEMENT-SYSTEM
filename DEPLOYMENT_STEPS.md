# QuickMart Deployment Steps

## Live Links To Submit

Frontend (Vercel):

Backend (Render):

Database (Railway MySQL):

Admin Login:
- Email: admin@quickmart.com
- Password: admin123

Customer Login:
- Email: customer@quickmart.com
- Password: customer123

## Vercel Frontend Settings

Root Directory: frontend
Framework Preset: Angular
Install Command: npm install
Build Command: npm run build
Output Directory: dist/frontend

## Render Backend Settings

Root Directory: backend
Environment: Java
Build Command: mvn clean package -DskipTests
Start Command: java -jar target/oms-backend-0.0.1-SNAPSHOT.jar

Environment Variables:
- SPRING_DATASOURCE_URL=jdbc:mysql://YOUR_HOST:YOUR_PORT/YOUR_DATABASE?useSSL=true&allowPublicKeyRetrieval=true
- SPRING_DATASOURCE_USERNAME=YOUR_DATABASE_USERNAME
- SPRING_DATASOURCE_PASSWORD=YOUR_DATABASE_PASSWORD
- APP_CORS_ALLOWED_ORIGINS=https://YOUR_VERCEL_LINK
- OMS_JWT_SECRET=quickmart-production-secret-2026

## Database

Use Railway MySQL or any online MySQL provider.
After creating MySQL, copy host, port, database, username and password into Render environment variables.
