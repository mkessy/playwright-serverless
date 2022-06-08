FROM public.ecr.aws/lambda/nodejs:14 as builder
WORKDIR /
COPY package.json index.ts tsconfig.json ./
RUN npm install && npm run build


FROM public.ecr.aws/lambda/nodejs:14
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /dist/*.js ./
COPY --from=builder ./node_modules ./
CMD [ "index.renderScreenshot" ]