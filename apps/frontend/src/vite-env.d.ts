/// <reference types="vite/client" />
import "@emotion/react"

declare module "@emotion/react"{
    export interface Theme{
        colors:{
            primary:string;
            secondary:string;
            white:string;
            black:string;
        }
    }
}