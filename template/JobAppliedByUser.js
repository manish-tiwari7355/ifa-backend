const JobAppliedByUser = (job) => {
  return `
         
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Add styles here */
          img {
            width: 50%;
            display: block;
            margin: 0 auto;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            text-align: left;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
          .section {
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <img src="https://ifa-appplication.s3.ap-south-1.amazonaws.com/ifa/jobs/logoIFA-01ada53f-9222-4bbf-aca2-5bbeb3c5737a.png" alt="Logo" >
          <div class="header">
            Job Application Received
          </div>
          <div class="section">
            <p>Dear ${job?.name},</p>
            <p>Thank you for submitting your job application for the position at our organization. We have received your application and it is currently under review.</p>
            <p>We appreciate your interest in joining our team and we will be in touch with you shortly regarding the status of your application.</p>
            <p>Please do not hesitate to contact us if you have any questions or concerns.</p>
            <p>Best regards,</p>
            <p>International Fateh Academy</p>
          </div>
        </div>
      </body>
    </html>
    
  
        `;
};
module.exports = JobAppliedByUser;
