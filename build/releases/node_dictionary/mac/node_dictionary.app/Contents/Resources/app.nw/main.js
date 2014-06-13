var jsdom = require('jsdom');


$(function(){
  var resultPanel = $('#resultPanel');

  $("#searchBox").on("keydown" , function(e) {
    if(e.keyCode === 13) {
        letsSearch();
    }
  });

  $("#searchButton").click(function(){
    letsSearch();
  });

  function letsSearch(){
      var searchWord = $("#searchBox").val();
      var resultMean = find_major_mean(searchWord);
  }

  function find_major_mean(word, callback){
    resultPanel.html("~찾는중찾는중~");
    jsdom.env({
          url: "http://dic.daum.net/search.do?dic=eng&search_first=Y&q="+word,
          scripts: ["http://code.jquery.com/jquery.js"],
          done: function (errors, window) {
            var $ = window.$;
            var target = "";
            if(isKorean(word)) {
                target = $(".list_search .result.eng_sch .tit_searsch .link_txt");
            }else{
                target = $(".list_search .txt_means_KUEK");
            }

            var result = "";
            target.each(function (index, value) {
                result += $(value).text() + "<br>";
            });
            resultPanel.html(result);
          }
        });
   }

   function isKorean(word){
     var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
     if(check.test(word)){
         return true;
     }else{
       return false;
     }

   }
})
