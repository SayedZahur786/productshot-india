import {defineConfig}from '@playwright/test';
export default defineConfig({testDir:'./tests',testMatch:'**/*.spec.ts',timeout:180000,workers:1,use:{baseURL:'http://127.0.0.1:3100',viewport:{width:1440,height:1000},trace:'retain-on-failure'},webServer:{command:'LOCAL_PREVIEW=1 npm run start -- --port 3100',url:'http://127.0.0.1:3100',reuseExistingServer:true,timeout:60000}});
