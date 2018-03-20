# RecruitRs Client

## Dependencies

Before you proceed, you'll need the following:
- A suitable computer
- [NodeJS](https://nodejs.org/en/)

## Setup

1. Open the command line and run `npm install -g cordova ionic`.
2. Clone the repository.
3. Navigate to the repository in the command line and run `ionic serve`.
4. Congratulations, you're done!

## Environment Config

1. After cloning the repository, create a directory named `environments` inside the `src` folder.
2. Create two files - `environment.ts` and `environment.dev.ts`
3. Edit variables if necessary.

### environment.ts

```
export const environment = {
    mode: 'Production',
    api_url: 'http://35.170.211.62:8080'
}
```

### environment.dev.ts

```
export const environment = {
    mode: 'Development',
    api_url: 'http://localhost:8080'
}
```

## Testing

### Unit Testing

Run `npm run test` to run all unit tests. This command will run all `*.spec.ts` files.

### End-to-end Testing

Run `npm run e2e` to run all end-to-end tests. This command will run all `*.e2e-spec.ts` files in the `e2e` folder.
