module.exports = {
  T_REDIS_STRUCTURE_ENDPOINT: (strings, ...values) => `link${values[0]}:${values[1]}`,
  T_REDIS_STRUCTURE_LIST: (strings, ...values) =>
    `SISMEMBER ${values[0]}:${values[1]}  ${values[2]}`,
  URL_FORMATT: (strings, ...values) => `${values[0]}://${values[1]}:${values[2]}${values[3]}`,
  STR_POSIBLE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  STR_PUBLIC: 'PUBLIC',
  STR_PRIVATE: 'PRIVATE',
  STR_TYPE_REST: 'REST',
  STR_TYPE_SOAP: 'SOAP',
  STR_TYPE_ASP: 'ASP',
  JWTCIPHERS: ['HS256', 'HS384', 'HS512'],
  CIPHERS: ['aes128', 'aes-128-cbc', 'aes192', 'aes256'],
  H_ST_OK: (...args) => ({
    statusCode: args[0],
    message: args[1],
    data: args[2],
  }),
  H_ST_ERR: (...args) => ({
    statusCode: args[0],
    message: args[1],
    error: args[2],
  }),
  ACTIVATE_USR_HTML: (title, content, url, button) => `<center>
    <table cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td colspan="2">
                    <center> <img
                            src="https://ci4.googleusercontent.com/proxy/9QqyBBnEo3pYKnL5XdD4PVzGSNsUtSdUWPiTcDjM9OmeHy32LbdrQ1YvQ8ECI2SOf3M0MmKWAGOJ7asKieFnzKIaJLBa0QJU2xR1hKZer0vfBLM_OHyAXO1f=s0-d-e1-ft#./images/PWR4.svg"
                            style="display:block" class="CToWUd"> </center>
                </td>
            </tr>
            <tr>
                <td valign="top" style="text-align:center;">
                    <h1> <span style="font-family: sans-serif;">${title}</span> </h1>
                    <p
                        style="font-family: sans-serif;font-size: 20px;padding-left: 25%;width: 50%;color: darkslategray;">
                        ${content} </p>
                        
                    <a href="${url}">
                    ${url}
                    </a>
                </td>
            </tr>
         </tbody>
    </table>
</center>`,
};
