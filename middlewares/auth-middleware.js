const jwt=require('jsonwebtoken');
const mySecret="25CskDFXytWY6+jJbO3MitZUbKPQ0RhX0GNOr2E7DZFMGNeXMfE9XBsba++BgK9xmO9JsS54jvikpTbXV8qe84duI1FJPp+jEMp+HpxAocRCauxZAR9bz7tYjSqwxVX28zB1u6Y3ZZu7gmActVpBKHlDNS7zjIsMod1y3J3oBY0KmPgqJyoTVcOj2K4j6S64Kd7iNZBv1jkroNqt+ImKhdlAXPsYzF5QkCLK2nldGLOFl+6d0e1/fvpplUyP9AUv/oLHeX/9mfWSMU7Apo0DmlZbx3KLpUjPddVorPHn3L0w+Jgz8UsU2f91AwsHB13RwLW/64WuqT5LXQmjYKLtOA=="

const requireAuth=async(req,res,next)=>{
  const token=req.headers.authorization;
  try{
    const decoded = jwt.verify(token,mySecret);
    req.userId = decoded.id;
    return next();
  }catch(err){
    console.log({err});
    res.json({message: "Unauthorised access, please add the token"})
  }
}
module.exports={requireAuth};