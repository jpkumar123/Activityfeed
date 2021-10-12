const bcrypt = require('bcrypt');

const hashContent =async content => {
   const hashedContent =  await bcrypt.hash(content, 10);
   return hashedContent;
}

const compareContent= async ( content, hashedContent ) => {
    const matched = await bcrypt.compare(content, hashedContent);
    return matched;
}


module.exports = {
    hashContent,
    compareContent
};
