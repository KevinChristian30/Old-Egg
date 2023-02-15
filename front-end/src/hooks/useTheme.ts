import getCookie from "@/utility/getCookie";

const useTheme = () => {

  if (getCookie("theme") === 'light') document.cookie = "theme=dark";
  else document.cookie = "theme=light";

  let theme = getCookie("theme")
  if (theme === "light"){
    document.documentElement.setAttribute('data-theme', "light");
  } else {
    document.documentElement.setAttribute('data-theme', "dark");
  }

}

export default useTheme;