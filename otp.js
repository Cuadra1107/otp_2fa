module.exports = { message, generateToken,getQRCode, validateOTP };

const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

function message(){
    return {
        "message":"Hello from inside otp"
    };
}

//generar token
function generateToken (){
    const secretKey = speakeasy.generateSecret({ length: 20, name:'ROG OTP' });
    console.log(secretKey);
    return {"token":btoa(JSON.stringify(secretKey))};
};

//Generar QR de token
async function getQRCode(token){
    
    let t = JSON.parse(atob(token));
    console.log(t);
    return new Promise((resolve, reject) => {
        qrcode.toDataURL(t.otpauth_url, (err, dataURL) => {
          if (err) {
              reject(err);
          } else {
              resolve(dataURL);
          }
      });
    });
};

//validar OTP
function validateOTP(secret, otp){
    let s = JSON.parse(atob(secret));

    console.log(s, otp);

    const verified = speakeasy.totp.verify({
        secret: s.base32,
        encoding: "base32",
        token: otp,
        window: 3
    });
      
    return {"status":verified};
};

function generateQRCode(token) {
    
};

