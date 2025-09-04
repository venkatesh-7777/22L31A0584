"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const axios_1 = __importDefault(require("axios"));
class Logger {
    constructor() {
        this.authToken = null;
        this.baseUrl = 'http://20.244.56.144/evaluation-service';
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authenticate();
            }
            catch (error) {
                console.error('Failed to initialize logger:', error);
            }
        });
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = {
                email: "venkateshkarri854@gmail.com",
                name: "karri v s m d satish",
                rollNo: "22l31a0584",
                accessCode: "YzuJeU",
                clientID: "8e699ce5-9b81-47a0-9739-bd0c3a2ca97f",
                clientSecret: "RdcVukwKYyquFbVY"
            };
            try {
                const response = yield axios_1.default.post(`${this.baseUrl}/auth`, credentials);
                this.authToken = response.data.access_token;
                console.log('Logger authenticated successfully');
            }
            catch (error) {
                console.error('Authentication failed:', error);
                throw error;
            }
        });
    }
    log(stack, level, packageName, message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!this.authToken) {
                yield this.authenticate();
            }
            // Create the exact payload structure the API requires
            const payload = {
                stack,
                level,
                package: packageName, // Note: API expects 'package' not 'packageName'
                message
            };
            console.log('Sending log payload:', payload);
            try {
                const response = yield (0, axios_1.default)({
                    method: 'post',
                    url: `${this.baseUrl}/logs`,
                    data: payload, // Send as JSON
                    headers: {
                        'Authorization': `Bearer ${this.authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            }
            catch (error) {
                console.error('Log request failed:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                // Try to re-authenticate if unauthorized
                if (axios_1.default.isAxiosError(error) && ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 401) {
                    yield this.authenticate();
                    try {
                        const retryResponse = yield (0, axios_1.default)({
                            method: 'post',
                            url: `${this.baseUrl}/logs`,
                            data: payload,
                            headers: {
                                'Authorization': `Bearer ${this.authToken}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        return retryResponse.data;
                    }
                    catch (retryError) {
                        console.error('Log retry failed:', retryError);
                    }
                }
                return null;
            }
        });
    }
}
// Create a singleton instance
const loggerInstance = new Logger();
// Export the log function for easy usage
const Log = (stack, level, packageName, message) => {
    return loggerInstance.log(stack, level, packageName, message);
};
exports.Log = Log;
exports.default = exports.Log;
