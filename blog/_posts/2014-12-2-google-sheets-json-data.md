---
title: Using Google Sheets as a JSON Data Source
layout: default
comments: true
---

## {{ page.title }}

### Things I have learned that might help you

Earlier this year, I developed a Bootstrap based site to list my home for sale by owner. Once that exercise was completed and we have now settled into our new place, I had this idea of converting the site into a template for others. [Link to GitHub repo](https://github.com/MrHobbie/Home4Sale2). There are lots of folks trying to sell their homes, but the resources available to them might not necessarily be directly suited to selling a home.

In planning on what I was going to do, the goal was to make it as easy to modify for someone who had limited web development skills. My first idea was to use a spreadsheet to hold the detailed specification information and then import that into the site. The easiest way I found was to use Google Sheets.  Google Sheets provides for a JSON data source, which should make the task of displaying detailed home specifications simple.

>Google Sheets provides for a JSON data source

I had other ideas around how to import the photos using Flickr or other photo sharing services. This idea I will incorporate into a later version of the template.

Of course every project begins with some research (aka Googling) to see what others have done. This proved both useful and frustrating. The useful part showed that it could be done, the frustrating part was that Google had made some changes to their API and the URL's weren't exactly the same.

After some good ole fashioned testing and changing one parameter at a time, I got it to go.  The following should prove to be helpful until the spec changes again.

The Google Sheet was setup to mirror the presentation in the website.

![Alt "Google Sheets"](/assets/images/2014-12-2/googleSheets.png "Google Sheets")

Note the headings; desc1, data1, etc. These heading names are become JSON field names and are then used to parse the data into the web page table.

With the spreadsheet complete, we need to make it public. (I am not sure what the process is, should you not wish to make your sheet public.) This step can be a little confusing, as there are a number of ways to make a sheet public, but only one way that works for this purpose.

Using the (F)ile menu, then (P)ublish to the Web. The following screen will be displayed:

![Alt "Google Sheets - Publish"](/assets/images/2014-12-2/googleSheets-2.png "Google Sheets - Publish")

At this point, you have the option to publish the Entire Document or just a single sheet. Once you have made your selection, click publish.

This screen will be displayed:
![Alt "Google Sheets - Share"](/assets/images/2014-12-2/googleSheets-3.png "Google Sheets - Share")

With this screen displayer, there are a number of options to share this document; Copy the URL as shown, or use one of the social icons shown.

For our purpose of using this Google Sheet as a JSON data source, simply copy the URL as shown.  The URL will look something like:

<pre><code class="html">https://docs.google.com/spreadsheets/d/<strong>1UaWeCOYaX6LUaxw-3EMkcxDd_tJcHVbivQzbou7XETI</strong>/pubhtml</code></pre>

The piece of the URL string that we are interested in, is the long key beginning with '1UaW...', of course yours will be different. This key will be used in the JSON query string.

#### Now the Magic Happens

##### jQuery Function
<pre><code class="javascript">
$(function () {  
  $.getJSON("https://spreadsheets.google.com/feeds/list/1UaWeCOYaX6LUaxw-3EMkcxDd_tJcHVbivQzbou7XETI/1/public/values?hl=en_US&alt=json", function( data) {
    var template = $('#spec-template').html();
    var info = Mustache.to_html(template, data.feed);
    $('#datadetails').html(info);
    });
  });
</code></pre>

The JSON call for data is a different URL than we saw earlier.  There are 3 components that I found you need to pay attention to:

  1. The KEY that we copied earlier.
  2. The number shown after the KEY refers to the number of spreadsheets, should you have more than one. In this case, we only have the one.
  3. The word 'values'. The other option I found was 'basic'.

The difference between 'values' and 'basic', is that 'values' parses our the data based on the headings we used in our spreadsheet. I am not going to demo 'basic', but you should take a look at the JSON object that is created, just to familiarize yourself.

For Mustache, we specify the code template #spec-template and then the output id #datadetails.

Mustache then converts data into HTML and loops through the JSON object; the HTML page code looks like:

{% gist 824af874db3af3a932c1 %}

To see the complete picture, the CSS code for the table:
<pre><code class="css">
#specDetails {
  height: 100%;
}
#specDetails h2 {
  margin: 70px 0 5px 20px;
}
#specDetails #datadetails {
  margin: 0 20px 0 20px;
}
#specDetails .col1,
#specDetails .col3,
#specDetails .col5 {
  width: 11%;
}
#specDetails .col2,
#specDetails .col4,
#specDetails .col6 {
  width: 22%;
}
#specDetails td {
  text-align: right;
  font-size: .9em;
  padding: 4px 4px 4px 4px;
  border: 1px solid #bbb;
}
#specDetails td.bd {
  font-weight: 600;
  text-align: center;
}
</code></pre>

This proved to be a great solution for streamlining the inclusion of a lot of data without the hassel of editing table tags.
