const AppliedJobs = (job) => {
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
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .field {
          margin-bottom: 10px;
        }
        .field label {
          font-weight: bold;
          display: inline-block;
          width: 150px;
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
          <div class="section-title">
            Personal Information
          </div>
          <div class="field">
            <label>Name:</label> ${job.name}
          </div>
          <div class="field">
          <label>Father's Name:</label> ${job.fathersName}
        </div>
          <div class="field">
            <label>Email:</label> ${job.email}
          </div>
          <div class="field">
            <label>Phone:</label> ${job.phone}
          </div>
        </div>
        <div class="section">
          <div class="section-title">
            Qualifications
          </div>
          ${job.qualifications}
        </div>
        <div class="section">
          <div class="section-title">
            Experience
          </div>
          ${
            job.experience > 1
              ? `${job?.experience}years`
              : `${job?.experience}year`
          }

        </div>
        <div class="section">
          <div class="section-title">
            Message
          </div>
          ${job.message}
        </div>
      </div>
    </body>
  </html>
  

      `;
};
module.exports = AppliedJobs;
