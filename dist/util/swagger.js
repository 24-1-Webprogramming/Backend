"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('NestJS API - hogun')
        .setDescription('webprogramming API')
        .setVersion('1.0.5')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map