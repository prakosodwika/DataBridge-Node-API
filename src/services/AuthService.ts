import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE, ServiceResponse, BadRequestWithMessage } from "$entities/Service";
import { UserLoginDTO, UserJWTDAO } from "$entities/User";
import { generateToken } from "$utils/jsonwebtoken.utils";
import { prisma } from "$utils/prisma.utils";
import Logger from '$pkg/logger';
import bcrypt from 'bcrypt'

export async function login(payloadBody: UserLoginDTO):Promise<ServiceResponse<{}>>{
    try{
        const {email, password} = payloadBody
        const user = await prisma.user.findUnique({
            where:{ email }
        })

        if (!user){
            return BadRequestWithMessage('Email not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid){
            return BadRequestWithMessage('Invalid Password')
        }

        const payloadToken: UserJWTDAO = {
            id: user.id.toString(),
            email: user.email,
            fullName: user.fullName,
            role: user.role
        };

        const token = generateToken(payloadToken);

        return {
            status:true,
            data:{
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            }
        }
    }catch(err){
        Logger.error(`AuthService.login : ${err}`)
        return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE
    }
}