# Production Readiness Checklist

Eco Home Palace Marketplace - Security and Production Requirements

---

## ⚠️ CRITICAL: Demo Mode Must Be Disabled Before Production

**Before deploying to production:**

1. Set `DEMO_AUTH_ENABLED = false` in `lib/auth.ts`
2. Remove `DemoRoleSwitcher` component from `app/layout.tsx`
3. Delete `components/DemoRoleSwitcher.tsx`
4. Implement real authentication provider
5. Add server-side role validation to all API routes

**Demo mode is for development/demo only. Client-side role switching is never secure.**

---

## Authentication & Authorization

### Required
- [ ] Implement real authentication provider (NextAuth, Clerk, Supabase Auth, or similar)
- [ ] Replace `getMockCurrentUser()` with real session management
- [ ] Add login/logout functionality
- [ ] Implement password reset flow
- [ ] Add email verification for new users
- [ ] Implement session management with secure cookies
- [ ] Add role-based access control (RBAC) enforcement server-side
- [ ] Replace mock authorization helpers with real permission checks

### Current State
- Mock auth helpers in `lib/auth.ts` provide structure for real auth
- Authorization helpers define role-based permissions
- UI components have authorization checks in place
- API routes have security comments for future implementation

---

## Database Persistence

### Required
- [ ] Replace localStorage with production database (PostgreSQL, Supabase, or similar)
- [ ] Update `marketplaceStorage.ts` to use database client
- [ ] Implement database migrations for schema changes
- [ ] Add database connection pooling
- [ ] Implement database backup strategy
- [ ] Add database query optimization and indexing
- [ ] Implement data retention policies

### Current State
- Storage adapter in `marketplaceStorage.ts` provides abstraction layer
- Can be replaced with database client without changing service layer
- Mock data in `mockMarketplaceData.ts` for development

---

## Server-Side Validation

### Required
- [ ] Add input validation on all API endpoints
- [ ] Validate email formats, phone numbers, postcodes
- [ ] Sanitize user input to prevent XSS
- [ ] Validate file uploads (size, type, content)
- [ ] Implement request size limits
- [ ] Add schema validation (Zod, Yup, or similar)
- [ ] Validate business logic constraints (e.g., lead capacity)

### Current State
- API routes have validation comments
- Service layer has typed input contracts
- No server-side validation implemented yet

---

## Payment Processing

### Required
- [ ] Integrate payment gateway (Stripe, Mollie, or similar)
- [ ] Implement lead payment flow on acceptance
- [ ] Add payment verification before lead contact reveal
- [ ] Implement refund policy and handling
- [ ] Add payment webhooks for status updates
- [ ] Implement payment reconciliation
- [ ] Add invoice generation
- [ ] Implement tax calculation and reporting

### Current State
- Lead pricing calculated in matching logic
- No payment processing implemented
- Payment structure ready for integration

---

## Notification System

### Required
- [ ] Implement email service (SendGrid, Resend, or similar)
- [ ] Add email templates for lead creation
- [ ] Add email notifications for lead status changes
- [ ] Add email notifications for installer application status
- [ ] Implement SMS notifications for urgent updates
- [ ] Add in-app notification system
- [ ] Implement notification preferences
- [ ] Add notification audit logs

### Current State
- No notification system implemented
- Service layer has comments for notification triggers

---

## Audit Logs

### Required
- [ ] Log all user authentication events
- [ ] Log all lead status changes
- [ ] Log all lead contact detail accesses
- [ ] Log all installer application submissions
- [ ] Log all admin actions
- [ ] Implement log retention policy
- [ ] Add log monitoring and alerting
- [ ] Implement log export for compliance

### Current State
- No audit logging implemented
- Comments in code indicate where logging should be added

---

## Rate Limiting

### Required
- [ ] Implement rate limiting on all API endpoints
- [ ] Add rate limiting for lead creation
- [ ] Add rate limiting for installer applications
- [ ] Implement IP-based rate limiting
- [ ] Add user-based rate limiting
- [ ] Implement CAPTCHA for abuse prevention
- [ ] Add rate limit monitoring and alerting

### Current State
- No rate limiting implemented
- Comments in API routes indicate where to add

---

## GDPR / Privacy

### Required
- [ ] Implement privacy policy page
- [ ] Add cookie consent banner
- [ ] Implement data deletion requests
- [ ] Add data export functionality
- [ ] Implement data retention policies
- [ ] Add privacy impact assessment
- [ ] Implement consent management
- [ ] Add GDPR compliance documentation

### Current State
- No GDPR compliance implemented
- No privacy policy

---

## Admin Access Control

### Required
- [ ] Implement admin role verification
- [ ] Add admin approval workflow for new installers
- [ ] Implement admin activity logging
- [ ] Add admin session timeout
- [ ] Implement admin IP whitelist (optional)
- [ ] Add admin multi-factor authentication
- [ ] Implement admin role hierarchy

### Current State
- Admin role defined in auth types
- Admin authorization helper implemented
- No real admin verification

---

## Installer Approval Workflow

### Required
- [ ] Implement installer application review process
- [ ] Add admin approval/rejection workflow
- [ ] Implement installer verification (certifications, insurance)
- [ ] Add installer onboarding checklist
- [ ] Implement installer background checks
- [ ] Add installer performance tracking
- [ ] Implement installer deactivation process

### Current State
- Installer application flow stores applications
- No approval workflow implemented
- Admin can view applications via API placeholder

---

## Security Hardening

### Required
- [ ] Implement HTTPS only
- [ ] Add security headers (CSP, HSTS, X-Frame-Options)
- [ ] Implement CORS policy
- [ ] Add CSRF protection
- [ ] Implement secure cookie settings
- [ ] Add input sanitization
- [ ] Implement SQL injection prevention
- [ ] Add dependency vulnerability scanning
- [ ] Implement secrets management (environment variables)
- [ ] Add API key rotation

### Current State
- Security comments in API routes
- No security hardening implemented

---

## Monitoring & Observability

### Required
- [ ] Implement application monitoring (Sentry, LogRocket, or similar)
- [ ] Add error tracking
- [ ] Implement performance monitoring
- [ ] Add uptime monitoring
- [ ] Implement database monitoring
- [ ] Add API response time tracking
- [ ] Implement alerting for critical issues
- [ ] Add health check endpoints

### Current State
- No monitoring implemented

---

## Testing

### Required
- [ ] Add unit tests for service layer
- [ ] Add integration tests for API routes
- [ ] Add E2E tests for critical flows
- [ ] Implement load testing
- [ ] Add security testing
- [ ] Implement penetration testing
- [ ] Add accessibility testing
- [ ] Implement cross-browser testing

### Current State
- No automated tests implemented

---

## Deployment

### Required
- [ ] Set up production environment
- [ ] Implement CI/CD pipeline
- [ ] Add staging environment
- [ ] Implement database migrations in CI/CD
- [ ] Add environment variable management
- [ ] Implement blue-green deployment
- [ ] Add rollback strategy
- [ ] Implement database backup automation

### Current State
- Build works locally
- No deployment pipeline

---

## Documentation

### Required
- [ ] Add API documentation (OpenAPI/Swagger)
- [ ] Document authentication flow
- [ ] Document authorization model
- [ ] Add deployment guide
- [ ] Document troubleshooting procedures
- [ ] Add onboarding documentation for new developers
- [ ] Document database schema
- [ ] Add runbook for common operations

### Current State
- Code has comments for future implementation
- No external documentation

---

## Compliance

### Required
- [ ] Implement terms of service
- [ ] Add refund policy
- [ ] Implement cookie policy
- [ ] Add accessibility compliance (WCAG 2.1 AA)
- [ ] Implement data processing agreement
- [ ] Add vendor risk assessment
- [ ] Implement security compliance (SOC 2, ISO 27001 if applicable)

### Current State
- No compliance documentation

---

## Performance

### Required
- [ ] Implement caching strategy (Redis, or similar)
- [ ] Add CDN for static assets
- [ ] Implement image optimization
- [ ] Add lazy loading for components
- [ ] Implement code splitting
- [ ] Add database query optimization
- [ ] Implement API response caching
- [ ] Add performance budget monitoring

### Current State
- Next.js optimization built-in
- No custom caching strategy

---

## Scalability

### Required
- [ ] Implement horizontal scaling strategy
- [ ] Add load balancing
- [ ] Implement database read replicas
- [ ] Add queue system for background jobs
- [ ] Implement microservices architecture (if needed)
- [ ] Add auto-scaling configuration
- [ ] Implement CDN edge caching
- [ ] Add geographic distribution

### Current State
- Monolithic architecture
- No scaling strategy

---

## Backup & Disaster Recovery

### Required
- [ ] Implement automated database backups
- [ ] Add backup verification
- [ ] Implement off-site backup storage
- [ ] Add disaster recovery plan
- [ ] Implement failover testing
- [ ] Add data restoration procedures
- [ ] Implement business continuity plan

### Current State
- No backup strategy
- No disaster recovery plan

---

## Priority Matrix

### Critical (Before Launch)
- Authentication & authorization
- Database persistence
- Server-side validation
- Payment processing
- Security hardening
- Admin access control

### High (Within First Month)
- Notification system
- Audit logs
- Rate limiting
- GDPR/privacy
- Installer approval workflow
- Monitoring & observability

### Medium (Within First Quarter)
- Testing automation
- Deployment pipeline
- Documentation
- Performance optimization
- Backup & disaster recovery

### Low (Ongoing)
- Compliance certifications
- Scalability improvements
- Advanced features
