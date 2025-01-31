// const mysql=require("mysql2")
const nodemailer=require("nodemailer")
require("dotenv").config()
const{
    validateEmail,
    validateFields,
    formatDateTime,
    isEmpty,
    validatePhoneNumber
}=require("../utils/index")
const logger=require("../loggerConfigs")

/* 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
*/

const registration=(req,res)=>{
    try{
        console.log(req.body)
        const{citizenship,identification,specifyPurpose,phoneNumber,address,email,businessType,companyName,tinNumber,registrationDate,businessaddress,purposeOfImportation,productCategory,Weight,unitOfMeasurement,quantity,description,otherNames,surName,nationality}=req.body
        const requiredFields=['citizenship','phoneNumber','address','email','businessType','companyName','tinNumber','registrationDate','businessaddress','purposeOfImportation','productCategory','Weight','unitOfMeasurement','quantity','description']
        const missingFields=validateFields(req,requiredFields)
        const date=formatDateTime(registrationDate)
        if(missingFields.length>0){
            logger.error(
                `Adding business owner:Required fields are missing:${missingFields.join(', ')}`
            )
            return res.status(400).json({
                ok:false,
                message:`Required fields are missing:${missingFields.join(', ')}`
            })
        }
        if (!validateEmail(email)) {
            logger.error(`Adding business owner: Invalid email:${email}`);
            return res.status(400).json({
              ok: false,
              message: 'Invalid credentials',
              info: 'The email should follow the following pattern xxx@xxx.xxx',
            });
        }
        if(!validatePhoneNumber(phoneNumber)){
            logger.error(`Adding business owner: Invalid phone number:${phoneNumber}`)
            return res.status(400).json({
                ok:false,
                message:"Invalid phone number",
                info:"Phone number should be at least 10 numbers"
            })
        }
        
        /* 
        const sql1 = `INSERT INTO ImportationDetails (purposeOfImportation, productCategory, weight, unitOfMeasurement, quantity, description) VALUES ('${purposeOfImportation}','${productCategory}','${Weight}','${unitOfMeasurement}','${quantity}','${description}')`;
        const sql2 = `INSERT INTO businessOwner (citizenship, phoneNumber, address, email) VALUES ('${citizenship}','${phoneNumber}','${address}','${email}')`;
        const sql3 = `INSERT INTO businessdetails (businessType, companyName, tinNumber, registrationDate,address) VALUES ('${businessType}','${companyName}','${tinNumber}','${date}','${businessaddress}')`;

        pool.query(sql1, (error, results, fields) => {
            if (error) {
              console.error('Error executing query:', error);
              return;
            }
            console.log('Query result:', results);
          });

          pool.query(sql2, (error, results, fields) => {
            if (error) {
              console.error('Error executing query:', error);
              return;
            }
            console.log('Query result:', results);
          });
         
          pool.query(sql3, (error, results, fields) => {
            if (error) {
              console.error('Error executing query:', error);
              return;
            }
            console.log('Query result:', results);
          });
        */

          const emailBody = `
      <h2>Form Submission</h2>
      <p><strong>Citizenship:</strong> ${citizenship}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Province:</strong> ${address}</p>
      <p><strong>Business Type:</strong> ${businessType}</p>
      <p><strong>Business Address:</strong> ${businessaddress}</p>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>TIN Number:</strong> ${tinNumber}</p>
      <p><strong>Registration Date:</strong> ${registrationDate}</p>
      <p><strong>Purpose of Importation:</strong> ${purposeOfImportation}</p>
      <p><strong>Product Category:</strong> ${productCategory}</p>
      <p><strong>Weight:</strong> ${Weight}</p>
      <p><strong>Unit of Measurement:</strong> ${unitOfMeasurement}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Identification:</strong> ${identification}</p>
      <p><strong>Other names:</strong> ${otherNames}</p>
      <p><strong>surName:</strong> ${surName}</p>
      <p><strong>Nationality:</strong> ${nationality}</p>
      <p><strong>Specific purpose for importation:</strong> ${specifyPurpose}</p>
    `;
    sendEmail(email, emailBody);

        console.log("Processed registration (DB queries skipped)");
        
    }
    catch(err){
        console.log(err.message)
    }
}

async function sendEmail(email,emailBody) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.YOUR_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  await transporter.sendMail({
    from: process.env.YOUR_EMAIL,
    to: email,
    subject: 'Form Submission',
    html: emailBody
  });

  console.log('Email sent successfully');
}

module.exports={registration}
