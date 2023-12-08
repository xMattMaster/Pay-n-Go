"use server"
import * as bcrypt from 'bcryptjs';

function check(clearText: any, hash_text: any) {
    return bcrypt.compareSync(clearText, hash_text);
}

export async function loginRequest(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    const res = await fetch('https://basidati.netsons.org/scripts/login.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

export async function login(params: { parameters: string; formData: FormData; }) {

    let out = {
        "result": "0",
        "message": ""
    };
    await loginRequest(params.parameters).then(response => {
        if (response["res"] == 1) {
            let in_psw = response["psw"];
            let id = response["id"];
            if (check(params.formData.get("password"), in_psw) == true) {
                out.result = "1";
                out.message = id;
            } else {
                out.result = "-1";
                out.message = in_psw;
            }
        }
        else {
            out.message = response["message"];
        }
    });
    return out;
}