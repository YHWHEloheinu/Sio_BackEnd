function header(tituloCorreo){
    return head = `<body style="margin: 0; padding:0;">
    <table border="0" cellpadding="0" width="100%">
        <tr>
            <td>
                <table align="center" border=".5" cellpading="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                        <td align="center" bgcolor="#1c2831" style="padding: 40px 0 30px 0;">
                        <a href="https://imgbb.com/"><img src="https://i.ibb.co/ZxScX13/Icon.png" alt="Icon" border="0"></a>    
                        <h2 style="color: #ffffff" font-family: Arial, sans-serif;>Solicitud de Material</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #1c2831; font-family: Arial, sans-serif; font-size: 24px;">
                                        <b>
                                            ${tituloCorreo}
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 30px 0;" style="color: #1c2831; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">`
                                
}
const footer = `</td>
</tr>
<tr>
    <td>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td width="260" valign="top" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                    
                </td>
                <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                <td width="260" valign="top" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>`

module.exports = {
    header,
    footer
}