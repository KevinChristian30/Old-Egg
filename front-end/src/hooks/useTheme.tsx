const useTheme = () => {

  if (sessionStorage.getItem("theme") === 'light') sessionStorage.setItem("theme", "dark");
  else sessionStorage.setItem("theme", "light");

  let theme = sessionStorage.getItem("theme")
  if (theme === "light"){
    document.documentElement.setAttribute('data-theme', "light");
  } else {
    document.documentElement.setAttribute('data-theme', "dark");
  }

}

export default useTheme;