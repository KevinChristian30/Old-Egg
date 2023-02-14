const useTheme = () => {

  if (localStorage.getItem("theme") === 'light') localStorage.setItem("theme", "dark");
    else localStorage.setItem("theme", "light");

    let theme = localStorage.getItem("theme")
    if (theme === "light"){
      document.documentElement.setAttribute('data-theme', "light");
    } else {
      document.documentElement.setAttribute('data-theme', "dark");
    }

}

export default useTheme;