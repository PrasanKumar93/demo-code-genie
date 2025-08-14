# Overview of As-Is State

## Simplified Summary
- Employees currently use **multiple disconnected systems** to access information:
  - Emails, departmental channels, shared drives, and independent apps.
- Collaboration is **ad-hoc**, with no central knowledge-sharing platform.
- Company updates/events are **not centralized**, limiting employee engagement.
- Current state assessment covers:
  - Application landscape.
  - Logical workflows.
  - Data management practices.
  - User interactions.

### Current Architecture Flow (High-Level)
1. **External Access**
   - Traffic enters via **Akamai** (CDN, WAF, DDoS, Bot Management).
   - Routed through **Azure Traffic Manager** for global load balancing.

2. **Connectivity Hub**
   - Routes to Central India/South India GLZ VNET hubs.
   - Equipped with App Gateway public IP, ExpressRoute, VPN gateways.
   - Firewalls (Palo Alto) secure Internet/Intranet access.

3. **Management VNET**
   - Handles DevOps and Azure Active Directory operations.

4. **Application VNETs**
   - Separate environments for **Non-Prod**, **Prod**, and **Disaster Recovery**.
   - Subnets for App services, Web services, DB, Dev endpoints.

5. **Shared Services**
   - Azure SQL DB, Redis Cache, Key Vault, App Insights.

6. **Web Portal Placement**
   - Azure Application Gateway in connectivity hub.
   - Azure API Management Gateway in Prod & Non-Prod VNETs.
   - AKS clusters in application subnets.
   - Internal Azure Load Balancer + NSGs for subnet security.

### Application Landscape
- Mix of tools for project management, customer management, tenant relations, data analytics.
- Many systems run independently with limited integration.

### Roles & Span of Control
- **General User**: Consumes information.
- **Content Manager**: Maintains department content.
- **Super Admin**: Manages content site-wide.
- **HR Admin**: Maintains public module content (CEO Messages, News, etc.).
- **Leadership**: Access to dashboards & action items.
- **External Partners**: Vendors, consultants, JV partners.

---

## Original BRD Text

Currently employees navigate multiple systems for accessing various information and 
collaboration is often ad-hoc and lacks a centralized platform for knowledge sharing. Employees 
heavily rely on unorganized emails, departmental channels, shared drives, and disparate systems 
for information access and task completion. Employee engagement is limited due to the absence 
of a dedicated platform for company updates and events. 
Assessment involves analyzing the current applications landscape, logical workflows, data 
management practices and user interactions. 

### 6.1 Current Architecture components and logical flow description
Architecture Components depicting the different existing Applications in the BU/Function  

**6.1.1 Logical Flow Description**  
- **6.1.1.1 External Access**  
  ✔ Traffic enters through Akamai (CDN + WAF + Layer 7 DDoS + Bot Management).  
  ✔ It then passes through the Azure Traffic Manager for global load balancing.  

- **6.1.1.2 Connectivity Hub**  
  ✔ Traffic is routed to either the Central India or South India GLZ-Connectivity-Hub-VNET.  
  ✔ Each hub contains App Gw PubIP, ExpressRoute, and VPN Gateways.  
  ✔ Internet and Intranet PAs (like Palo Alto firewalls) provide security.  

- **6.1.1.3 Management VNET**  
  ✔ A separate GLZ-Management-VNET handles DevOps and AAD related operations.  

- **6.1.1.4 Application VNETs**  
  ✔ Traffic is then routed to appropriate application VNETs:  
  - AC-Common-NonProd-VNET for non-production environments.  
  - AC-Common-Prod-VNET for production.  
  - AC-Common-DR-VNET for disaster recovery.  
  ✔ Each application VNET contains subnets for: APP-SNET (Application services), WEB-SNET (Web services), DB-SNET (Database services), DEV-PE-SNET (Development private endpoints).  

- **6.1.1.5 Shared services**  
  ✔ Azure SQL DB, Azure Redis Cache, and Azure Key Vault are used across environments.  
  ✔ Application Insights is used for monitoring.  

- **6.1.1.6 Additional components placement for the web portal**  
  ✔ Azure Application Gateway (Public Facing) in the GLZ-Connectivity-Hub-VNET.  
  ✔ Azure API Management Gateway in AC-Common-Prod-VNET and AC-Common-NonProd-VNET, possibly in a new subnet.  
  ✔ AKS Cluster in APP-SNET of both Prod and Non-Prod VNETs.  
  ✔ Azure Load Balancer internal to AKS cluster.  
  ✔ NSGs applied to each subnet.

### 6.2 Existing Azure Architecture in Adani Landscape
*(Diagram/description in original document)*

### 6.3 Existing Application Landscape
The existing application landscape for Adani Realty & DRPPL encompasses a diverse set of tools 
and systems that support various business functions within the real estate sector. These 
applications are integral to operations ranging from project management and tenant relations 
to customer service and data analysis.  

### 6.4 Span of Control
There will be 5 user roles:  
i. General User  
ii. Content Manager (Department Manager)  
iii. Super Admin  
iv. Admin (HR Department)  
v. Leadership (Dashboards, Action Items)  
vi. External partners  

General User: A user who is accessing the main front end of the website to consume the information is considered a general user.  

Content Manager: Manages specific department content. Added by Super Admin, with “Edit” button linking to CMS.  

Super Admin: Manages all website content using CMS, with ability to edit/delete any content.  

Admin Users: Primarily from HR, maintain public modules like CEO messages, news, birthdays.  

Leadership: Accesses different Power BI dashboards.  

External Partners: Includes Adani JV partners, Vendors, Consultants.
