$a = Get-Content .\freedict
for($j = 0; $j -lt $a.length;, $j++) {
  $path = "";
  for($i=0; $i -lt $a[$j].length; $i++) { 
    if($i -lt ($a[$j].length - 1)) {
      $path += $a[$j][$i] + "/";
      if (!(Test-Path -Path $path )) {
        New-Item -ItemType directory -Path $path;
      }
    } else {
      $path += $a[$j][$i] + ".f";
      if (!(Test-Path -Path $path )) {
        New-Item -ItemType file -Path $path;
      }      
    }    
  }   
}