module.exports = (email) => ({
    from: `SocialHub <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "⚠️ Content Violation Alert - SocialHub Community Guidelines",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background: #f8f9fa; }
          .header { 
            background: #2d3436; 
            padding: 2rem; 
            text-align: center; 
            border-radius: 12px 12px 0 0;
          }
          .content { 
            padding: 2rem; 
            background: white; 
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .alert-icon { 
            font-size: 48px; 
            color: #e74c3c; 
            margin-bottom: 1rem;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #3498db;
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            margin: 1rem 0;
            font-weight: 600;
          }
          .footer {
            text-align: center;
            padding: 1.5rem;
            color: #7f8c8d;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: white; margin: 0;">Community Guidelines Alert</h1>
          </div>
          
          <div class="content">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div class="alert-icon">⚠️</div>
              <h2 style="color: #2d3436; margin-bottom: 0.5rem;">Content Moderation Notice</h2>
              <p style="color: #7f8c8d;">Your recent post didn't meet our community standards</p>
            </div>
  
            <div style="background: #fff9f9; padding: 1.5rem; border-radius: 8px; border: 1px solid #ffe3e3;">
              <p style="margin: 0; color: #e74c3c;">
                🚫 Our automated systems detected content that violates our policies regarding cyberbullying or inappropriate content
              </p>
            </div>
  
            <div style="text-align: center; margin: 2rem 0;">
              <p style="color: #7f8c8d;">
                Please review our community guidelines before posting again. Repeated violations may result in account restrictions.
              </p>
              <a href="http://localhost:3000/guidelines" class="button">
                Review Guidelines
              </a>
            </div>
  
            <hr style="border: 1px solid #f1f3f5; margin: 2rem 0;">
  
            <div style="text-align: center;">
              <p style="color: #7f8c8d; margin-bottom: 0.5rem;">
                Need help? Contact our support team:
              </p>
              <p style="margin: 0;">
                <a href="mailto:support@socialhub.com" 
                   style="color: #3498db; text-decoration: none;">
                  support@socialhub.com
                </a>
              </p>
            </div>
          </div>
  
          <div class="footer">
            <p style="margin: 0;">
              This is an automated message - please do not reply directly<br>
              © ${new Date().getFullYear()} SocialHub. All rights reserved.<br>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
});