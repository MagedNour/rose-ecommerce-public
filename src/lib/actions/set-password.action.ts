'use server'

import { JSON_HEADER } from "@/lib/constants/api.constant"

export default async function setPasswordAction(fields: SetPasswordFeilds) {
    const response = await fetch(`${process.env.API}/auth/resetPassword`, {
        method: "PUT",
        headers: { ...JSON_HEADER },
        body: JSON.stringify(fields),
    })

    const payload: SetPasswordResponse = await response.json()

    return payload
}