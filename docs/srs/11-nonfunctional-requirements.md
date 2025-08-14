# Non-Functional Requirements

## Simplified Summary

**NFR1 – Availability**
- Application must run 24×7×365 without downtime.
- Handle high traffic, unexpected failures, and cyberattacks without performance loss.
- Log all errors for easy troubleshooting.

**NFR2 – Accuracy**
- Results should be 99.99% accurate.

**NFR3 – Performance**
- Smooth, seamless navigation throughout.
- Optimisation methods include caching, table indexing, limiting database calls, pagination, lazy loading.

**NFR4 – Maintainability**
- System must be easy to update for changing business needs.
- Recommended architecture: Microservices + loosely coupled modules so one change doesn’t break others.

**NFR5 – Design**
- Mobile app experience should be intuitive, visually appealing, and engaging.
- Use attractive elements and bright colours to increase adoption.

**NFR6 – Security**
- Must detect and block unauthorised access.
- Use security measures: security headers, tokenisation, encryption, input sanitisation, validation.

**NFR7 – Usability**
- Minimal training required — UI/UX should be intuitive.
- Seamless navigation to any module/page in as few clicks as possible.

**NFR8 – Compatibility**
- Compatible with most devices, operating systems, browsers, and platforms.

**NFR9 – Recovery**
- Fast recovery from crashes or failures.
- Easy fallback to previous version if defects found.
- Follow DevOps practices from the start.

---

## Original BRD Text

**NFR1 – Availability**
- The application must be available 24 hours a day, all days and year.  
- The application must handle high traffic, unexpected failures, and malicious attacks without compromising its performance or functionality.  
- Each level of error must be logged in to the stored files for easy troubleshooting.

**NFR2 – Accuracy**
- The application must be 99.99% accurate in its result.

**NFR3 – Performance**
- The navigation throughout the application should be seamless.  
- Techniques like Cache, table indexing, limiting database hits, pagination & lazy loading can be implemented to achieve the result.

**NFR4 – Maintainability**
- The application must be easily maintainable. It must have the ability to undergo changes with a degree of ease so that changing requirements can be accommodated.  
- The techniques like “Microservices architecture” and “Loosely coupled system” must be followed so that addition/modification/deletion of any module doesn’t severely affect the other modules.

**NFR5 – Design**
- The mobile app experience must be intuitive and enriching. Attractive elements & bright colours must be incorporated to attract more people to the mobile app.

**NFR6 – Security**
- Application must have the ability to handle the unauthorized person.  
- Techniques such as Security Headers, Tokenization, Encryption, Input Sanitization and Validation must be implemented to ensure the integrity of the application.

**NFR7 – Usability**
- The UI/UX must be such that the efforts required to learn, operate, and understand the application must be minimal.  
- The navigation in the app must be seamless. Accessing any module or page must take as few clicks as possible.

**NFR8 – Compatibility**
- The application must be compatible with most of the devices, operating systems, web browsers, and platforms as applicable.

**NFR9 – Recovery**
- The application must be able to recover quickly in case of any type of crash or failure.  
- The process of falling back to the earlier application version in case of defects in the new version must be easy & simple to follow.  
- DevOps practice should be followed from the beginning.
