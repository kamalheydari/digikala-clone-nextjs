# Digikala Clone NextJs

A advance clone of digikala includes products page, single product page, category, sorting, filtering, JWT authentication, login page, register page, edit user information, order cart, review and admin dashbord to add new product, accept reviews, add category, details and specification for category and more...

## Using

- NextJs
- Typescript
- TailwindCss
- MongoDB
- Redux - Toolkit - RTK Query
- JWT

## Features
Full-stack e-commerce website
- Allows registered users to place orders, write product reviews, and update their account information.

Admin privileges
- Enables creation of new product categories.
- Allows definition of unique specifications and features for each category.
- Manages banners, sliders, and new product listings.
- Updates the status of orders and reviews.

User-friendly search, filter, and sort functions
- Enables easy product discovery and sorting based on user preferences.
- Displays top discount products, most favorited items, and best-selling products for each category.

## How to install and run the project ...

1. Clone or download the repository by running the following command in your terminal:

```bash
git clone https://github.com/kamalheydari/digikala-clone-nextjs.git
```

2. Install the project dependencies using either npm or yarn:

```bash
npm install
```
or
```bash
yarn 
```

3. Define the required environment variables in a file named .env.local located in the root directory of the project. The following variables are necessary:
```bash
    MONGODB_URL=<your MongoDB connection URL>

    NEXT_PUBLIC_ACCESS_TOKEN_SECRET=<your access token secret>
    ACCESS_TOKEN_SECRET=<your access token secret>
    #  set the same value for this two varialbels
    #  Example:
    #  NEXT_PUBLIC_ACCESS_TOKEN_SECRET=69i60j69i57j35i39i650l2j0i512l3j69i60
    #  ACCESS_TOKEN_SECRET=69i60j69i57j35i39i650l2j0i512l3j69i60

    NEXT_PUBLIC_LIARA_ENDPOINT=<your Liara endpoint>
    NEXT_PUBLIC_LIARA_BUCKET_NAME=<your Liara bucket name>
    NEXT_PUBLIC_LIARA_ACCESS_KEY=<your Liara access key>
    NEXT_PUBLIC_LIARA_SECRET_KEY=<your Liara secret key>

```

4. Install [MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator) and [MongoDB Compass](https://www.mongodb.com/products/compass) on your local machine. If you already have a MongoDB instance set up, skip this step.

5. Download the database from the following link:
```bash
https://drive.google.com/drive/folders/1tonl8z-LbPM_umavCs9DBVs4hc0CmwVd?usp=sharing
```

6. Create a new database in MongoDB Compass and create the required collections with the same names as the downloaded JSON files. Then, import the data from the downloaded files into the corresponding collections.

7. Log in to [Liara](https://liara.ir/) for free and create a new bucket (ذخیره سازی ابری). Then, set the last four environment variables listed above to the corresponding values provided by Liara. This will allow the application to use Liara for cloud storage.

8. Create an account by accessing the following URL in your web browser:
```bash
http://localhost:3000/authentication/login
```

9. After creating the account, find your account in the database and change the `role` field to `root` and `root` field to `true`. This will grant you access to all the admin dashboard features.

## Demo

See demo on vercel
[Nextjs Digikala Clone](https://digikala-clone-nextjs-p.vercel.app/)

### Home Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_01.png)

### Category Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_02.png)

### Products Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_03.png)

### Product Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_04.png)

### Cart Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_05.png)

### Shipping Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_06.png)

### Profile Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_07.png)

### Adrress Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_08.png)

### Orders Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_09.png)

### Admin/Products Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_10.png)

### Admin/Edit Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_11.png)

### Admin/Details Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_12.png)

### Admin/Categories Tree Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_13.png)

### Admin/Banners Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_14.png)

### Admin/Categories List Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_15.png)

### Admin/Category Create Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_16.png)

### Admin/Sliders Page

![demo](https://digikala-clone-heydari-db.storage.iran.liara.space/digikala-demo/demo_17.png)
