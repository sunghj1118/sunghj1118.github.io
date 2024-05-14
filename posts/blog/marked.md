# Setting up marked.js
Date: 2024-05-14

## Introduction
The first issue I came accross upon after trying to set up my blog was that the markdown files were not being rendered properly. The images were not being displayed and the markdown was not being rendered. I had to find a way to render the markdown files properly.

![alt text](/images/first_post/2024-05-14-12.31.08PM.png)

## Solution
Eventually I was able to find a solution for the 'marked.js' library. I used the following code to render the markdown files properly.

```javascript
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

## Discussion
> ❓ Why did I choose marked.js?
>
> I chose marked.js because it is a fast markdown parser and compiler. I also found a lot of resources online that helped me set it up.

> ❓ Why were the full image paths not working?
>
> The full image paths were not working because I was serving locally from a lower directory. The image paths weren't being recognized due to this.  
![alt text](/images/first_post/2024-05-14-12.41.30PM.png)  
In the image above, the image path is being recognized.
![alt text](/images/first_post/2024-05-14-12.44.02PM.png)
However, in the image above, the image path is not being recognized despite having the same path in the link. This is due to the server being open in a higher directory.
