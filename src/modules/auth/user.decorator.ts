import { createParamDecorator } from "@nestjs/common";

/**
 * 
 * This decorator will map user request data by key (Auth strategy)
 */
export const GetUser = createParamDecorator( ( key, req ) => key ? req.user[key] : req.user );