const Koa = require('koa');
const { koaBody } = require('koa-body');
const Router = require('koa-router');
const cors = require('@koa/cors');
const otp = require('./otp');

const app = new Koa();
const router = new Router();

router.get('/api/', (ctx, next) => {
    ctx.body = {
        "message":"Hello World OTP",
        "version":"1.0.0"
    }
});

router.get('/api/otp', (ctx, next) => {
    ctx.body = otp.message();
});

router.get('/api/otp/generate', (ctx, next) => {
    ctx.body = otp.generateToken()
});

router.post('/api/otp/getqrcode', async (ctx, next) => {
    let token = ctx.request.body.token;

    ctx.response.body  = await otp.getQRCode(token).then((imageVal)=>{
        console.log(imageVal)
        ctx.status = 200;
        return  {qrcode: imageVal};
    });


    
});

router.post('/api/otp/validate', (ctx, next) => {
    let secret = ctx.request.body.token;
    let otpcode = ctx.request.body.otp;
    ctx.body = otp.validateOTP(secret,otpcode);
});

app.use(cors());
app.use(koaBody());
app.use(router.routes());
//404
app.use(async (ctx, next) => {
    try {
      await next()
      if (ctx.status === 404) {
        ctx.status = 404;
        ctx.body = {
            "message":"Page was not found"
        };
      }
    } catch (err) {
      // handle error
    }
})

app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
});