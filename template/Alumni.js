const Alumni = (data) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Alumni Update</title>
      <style type="text/css">
        body {
          font-family: Arial, sans-serif;
          font-size: 16px;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          background-color: #eee;
          text-align: left;
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
        td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <h2>Alumni Update</h2>
      <table>
        <tr>
          <th>Email:</th>
          <td>${data?.email}</td>
        </tr>
        <tr>
          <th>Name:</th>
          <td>${data?.name}</td>
        </tr>
        <tr>
          <th>Gender:</th>
          <td>${data?.gender}</td>
        </tr>
        <tr>
          <th>Year of Passout:</th>
          <td>${data?.yearOfPassout}</td>
        </tr>
        <tr>
          <th>Phone:</th>
          <td>${data?.phone}</td>
        </tr>
        <tr>
          <th>Branch:</th>
          <td>${data?.branch}</td>
        </tr>
        <tr>
          <th>Current Status:</th>
          <td>${data?.currentStatus}</td>
        </tr>
      </table>
      <h3>Message:</h3>
      <p>${data?.message}</p>
    </body>
  </html>
 
          `;
};
module.exports = Alumni;
