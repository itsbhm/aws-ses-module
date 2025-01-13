export interface EmailParams {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    isHtml?: boolean;
  }
  
  export interface EmailResult {
    success: boolean;
    result?: any;
    error?: string;
  }
  
  