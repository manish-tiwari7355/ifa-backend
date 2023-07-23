const dayjs = require("dayjs");

const AdmissionRegistration = (job) => {
  return `
           
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          /* Add CSS styles for proper indentation and formatting */
          /* Add inline CSS for logo */
          img {
            width: 50%;
            display: block;
            margin: 0 auto;
          }
          /* Add CSS for table formatting */
          table {
            border-collapse: collapse;
            width: 80%;
            margin: 0 auto;
          }
          th, td {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #dddddd;
          }
        </style>
      </head>
      <body>
        <img src="https://ifa-appplication.s3.ap-south-1.amazonaws.com/ifa/jobs/logoIFA-01ada53f-9222-4bbf-aca2-5bbeb3c5737a.png" alt="Logo" >
        <h1 style="text-align: center;">Admission Registration Details</h1>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td><strong>Name:</strong></td>
            <td>${job?.name}</td>
        </tr>
          <tr>
            <td><strong>DOB:</strong></td>
            <td>${dayjs(job?.dateOfBirth).format("DD-MMM-YYYY")}</td>
         </tr>
          <tr>
            <td><strong>Father's Name:</strong></td>
            <td>${job?.fatherName}</td>
          </tr>
          <tr>
            <td><strong>Mother's Name:</strong></td>
            <td>${job?.motherName}</td>
          </tr>
          <tr>
            <td><strong>Father's Occupation:</strong></td>
            <td>${job?.fatherOccupation}</td>
          </tr>
          <tr>
            <td><strong>Mother's Occupation:</strong></td>
            <td>${job?.motherOccupation}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>${job?.permanentAddress}</td
          </tr>
          <tr>
            <td><strong>Phone Number:</strong></td>
            <td>${job?.phone}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>${job?.email}</td>
         </tr>
          <tr>
            <td><strong>Remarks:</strong></td>
            <td>${job?.remarks ? job?.remarks : "--"}</td
          </tr>
        </table>
      </body>
    </html>
    
      
    
          `;
};
module.exports = AdmissionRegistration;
