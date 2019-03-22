Suppose a big yml file like below:

```
# the simple demo here
html:
  header: hello there
  # the body
  body:
    sidePanel: 'I am the side panel'
    container: 'I am  the container'
    imglist: 
      image1: 'I am image image 1'
      image2: 'I am image image 2'
  footer: 'I am the footer'
...
```

after install from npm `npm install find_key_from_yml`, 

run and pass line numbers: `what_is_line test.yml 9 `, 

it'll output this line's key in the yml object `html.body.imglist.image1` 